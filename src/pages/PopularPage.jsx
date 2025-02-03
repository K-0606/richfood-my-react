import MySearchField from "./MySearch/MySearchField";
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

const PopularPage = () => {
    
        const initialSearchParams = {
          type: [],  // 顯示所有餐廳類型
          region: [],  // 顯示所有地區
          price: [],  // 顯示所有價格篩選
          popular: true,  // 預設勾選最受歡迎餐廳
        };

    return(
    <>
    <h1>PopularPage</h1>
    <Header />
    <MySearchField initialSearchParams={initialSearchParams}/>
    <Footer />
    </>
    )
}
export default PopularPage;