import React, {
    Component
} from 'react'
import bibList from '../bibList.json'
import { Card, CardHeader, CardBody, CardFooter } from 'react-simple-card';
import { render } from 'react-dom';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';



class ListRestau extends Component {
    routeChange=(newPath)=> {
        let path = newPath;
        let history = useHistory();
        history.push(path);
    }
    render() {
        return (
            <div>
                {
                bibList.map((bibDetail, index)=>{
                    return <Card style={{width: '18rem'}}>
                        <CardHeader>{bibDetail.name}</CardHeader>
                    <CardBody>{bibDetail.experience}</CardBody>
                    <CardFooter>{bibDetail.location.city}
                    <Button href={bibDetail.url} >Access bib page</Button>
                    </CardFooter>
                    </Card>
                })
                }
            </div>
        );
    }
}
render (<ListRestau/>, document.getElementById('root'));
export default ListRestau;
