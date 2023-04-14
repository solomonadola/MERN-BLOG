import "./category.css";
import { category } from "../assets/data/data";
const Category = () => {
  return (
    <>
      <section className="category">
        <div className="content">
          {category.map((item) => (
            <div className="boxs" key={item.id}>
              <div className="box">
                <img src={item.cover} alt="" />
              </div>
              <div className="overlay">
                <h4>{item.category}</h4>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Category;
