import { Paper, Button } from '@mui/material';
import Link from 'next/link';
import Carousel from 'react-material-ui-carousel'
import styles from '@/styles/Header.module.css';

export default function CarouselItem() {
    var items = [
        {
            name: "Welcome To Fashion",
            image: "https://react.pixelstrap.com/assets/images/home-banner/2.jpg",
            description: "WOMEN FASHION"
        },
        {
            name: "Welcome To Fashion",
            image: "https://react.pixelstrap.com/assets/images/home-banner/1.jpg",
            description: "MEN FASHION"
        },
        {
            name: "Welcome To Fashion",
            image: "https://react.pixelstrap.com/assets/images/home-banner/2.jpg",
            description: "WOMEN FASHION"
        },
        {
            name: "Welcome To Fashion",
            image: "https://react.pixelstrap.com/assets/images/home-banner/1.jpg",
            description: "MEN FASHION"
        },
    ]

    return (


        <Carousel
            className={styles.carousel}
            autoPlay={false}
            duration={500}
            animation={'slide'}
            swipe={false}
            indicators={false}
            index={1}
        >
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel >

    )
}

function Item(props: any) {
    return (
        <Paper sx={{borderRadius: "0px"}}>
            <img className={styles.bckg} src={props.item.image}></img>
            <div className={styles.description}>
                <h2>{props.item.name}</h2>
                <h1>{props.item.description}</h1>
                <Link href='#products'>
                    <Button variant='contained' size='large' className={styles.btnSN}>SHOP NOW</Button>
                </Link>
            </div>

        </Paper >
    )
}