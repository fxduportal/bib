import React, {
    Component
} from 'react'
import bibList from '../bibList.json'
import { Card, CardHeader, CardBody, CardFooter } from 'react-simple-card';
import { render } from 'react-dom';



class ListRestau extends Component {
    render() {
        return (
            <div>

                {
                    bibList.map((bibDetail, index)=>{
                        return <Card style={{width: '18rem'}}>
                            <CardHeader>{bibDetail.name}</CardHeader>
                        <CardBody>{bibDetail.experience}</CardBody>
                        <CardFooter>{bibDetail.location.city}</CardFooter>
                        </Card>
                    })
                }
            </div>
        );
    }
}
render (<ListRestau/>, document.getElementById('root'));
export default ListRestau;
