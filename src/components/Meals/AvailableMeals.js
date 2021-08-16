import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from "./AvailableMeals.module.css";
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {

    const [meals, setMeals] = useState({});

    useEffect(() => {
        const fetchData = async() => {
            const resp = await fetch('https://food-order-app-b7683-default-rtdb.firebaseio.com/meals.json');
            const json = await resp.json();
            setMeals(json);
        };
        fetchData();
    }, []);

    let mealsList = [];
    for (const key in meals) {
        mealsList.push(<MealItem key={key} meal={meals[key]} />);
    }
    
    return <section className={styles.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
};

export default AvailableMeals;