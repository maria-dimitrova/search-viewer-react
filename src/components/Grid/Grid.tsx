import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { executeSearchFn } from '../../actions/search-actions';

interface IItemInfo {
    title: string;
    thumbnail: string;
    link: string;
}

interface IGridData {
    show: boolean;
    modal: {
        title: string;
        thumbnail: string;
        link: string;
    }
}

class Grid extends React.Component<{ searchResult: [], onExecuteSearch(e: string): void }, IGridData> {
    constructor(props: any){
        super(props);
        this.state = { show: false, modal: { title: "", thumbnail: "", link: "" } };
        this.modalDialog = this.modalDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);
    }

    public openDialog(item: any) {
        this.setState({ show: true, modal: { title: item.title, thumbnail: item.thumbnail, link: item.link } });
    }

    private modalDialog() {
        return (
            <>
              <Modal
                show={this.state.show}
                onHide={() => {this.setState({ show: false })}}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <Modal.Header closeButton={true}>
                  <Modal.Title id="example-custom-modal-styling-title">
                        {this.state.modal.title}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="text-center">
                    <iframe title={this.state.modal.title} width="1044" height="587" src={this.state.modal.link} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                  </div>
                </Modal.Body>
              </Modal>
            </>
          );
    }

    private cardItem(item: IItemInfo) {
        return (
            <Card onClick={() => {this.openDialog(item)}}>
                <div className="image-container">
                    <Card.Img variant="top" src={item.thumbnail} />
                </div>
                <Card.Body>
                    <Card.Title className="item-title">{item.title}</Card.Title>
                </Card.Body>
            </Card>
        );
    }

    private createGrid() {
        return (
            <Container>
                {(()=>{let columns: any = [];
                return this.props.searchResult.reduce((content: any, item: any, index: number)=>{
                    if(index !== 0) {
                        if(index % 4 === 0){
                            content.push(<Row className="items-row" key={index + 'f'}>{columns}</Row>); //
                            columns = [];
                        }
                        if(index === this.props.searchResult.length - 1) {
                            columns.push(<Col sm={3} key={index}>{this.cardItem(item)}</Col>);
                            content.push(<Row className="items-row" key={index + 'l'}>{columns}</Row>); //
                            columns = [];
                            return content;
                        }
                    }
                    columns.push(<Col sm={3} key={index}>{this.cardItem(item)}</Col>);
                    return content;
                }, [])})()}
                {this.props.searchResult.length > 0 && <div className="text-right m-1"><Button className="m-1" variant="outline-secondary" size="sm" onClick={()=>{this.props.onExecuteSearch('scroll')}}>Load more</Button></div> }
                {this.modalDialog()}
            </Container>
        ); 
    }

    public render() {
        return this.createGrid();
    }
}

const mapStateToProps = (state: any)=>({
    searchResult: state.activeTab.searchResult
});

const mapActionsToProps = {
    onExecuteSearch: executeSearchFn
};

export default connect(mapStateToProps, mapActionsToProps)(Grid);