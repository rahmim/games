import axios from "axios";
import {Container, Row} from "react-bootstrap";

const fetchCar = async (id) => {
    const { data } = await axios.get(`http://localhost:3001/api/cars?id=${escape(id)}`);
    return data;
};

export async function getServerSideProps(context){
console.log(context)
    // const forwarded = context.headers['x-forwarded-for'];

// const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
// console.log(ip);
    const data = await fetchCar(context.params.id);
    return {
        props: {
            data: data,
        }, // will be passed to the page component as props
    }
}


const Car = ({data}) => {
    return (
        <div>
            <Container>
                {data && (
                    <>
                        <Row>
                            <iframe width="100%" height="100%" frameBorder="0" className="loader" src={(data && data.iframe) || "SuperCar"}></iframe>
                        </Row>
                        <Row>
                            <h1 className="text-center">{(data && data.name) || "SuperCar"}</h1>
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );
}

export default Car;
