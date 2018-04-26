import './table.css';
import Menu from "./table.hbs"
import MenuItem from "../menuItem/menuItem.hbs"

export default class MenuTable{
    constructor() { }
    
    render(target, props) {
        let tab = document.getElementById("upload-menu-tab");
        tab.classList.add("nav-bar-selected");

        const menu = Menu(props);
        target.innerHTML = menu;
        if (props.menu) {
            const itemContext = {
                dayMenu: [
                    {
                        day: "sunday",
                        dish: [
                            {
                                dishName: "chiken",
                                dishWeight: "240g",
                                dishPrice: "200BNR"
                            },
                            {
                                dishName: "cake",
                                dishWeight: "240g",
                                dishPrice: "100BNR"
                            }
                        ]
                    },
                    {
                        day: "monday",
                        dish: [
                            {
                                dishName: "chiken",
                                dishWeight: "240g",
                                dishPrice: "200BNR"
                            },
                            {
                                dishName: "cake",
                                dishWeight: "240g",
                                dishPrice: "100BNR"
                            }
                        ]
                    },
                    {
                        day: "friday",
                        dish: [
                            {
                                dishName: "chiken",
                                dishWeight: "240g",
                                dishPrice: "200BNR"
                            },
                            {
                                dishName: "cake",
                                dishWeight: "240g",
                                dishPrice: "100BNR"
                            }
                        ]
                    },
                    {
                        day: "wednesday???",
                        dish: [
                            {
                                dishName: "chiken",
                                dishWeight: "240g",
                                dishPrice: "200BNR"
                            },
                            {
                                dishName: "cake",
                                dishWeight: "240g",
                                dishPrice: "100BNR"
                            }
                        ]
                    }
                ]
            }
            const items = MenuItem(itemContext);
            document.getElementById("menu-content").innerHTML = items;
            
        }    
        return target;
    }
}