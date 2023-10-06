import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import categories from './CategoriesList';

function Categories(props) {


    return (
        <div className='cat-container'>
            <div>
                <span className='pr-3'>All Categories</span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => {
                        return (
                            <span onClick={() => props.handleCategory && props.handleCategory(item)} key={index} className='category'> {item} </span>
                        )
                    })}
            </div>
        </div>
    )
}


export default Categories;