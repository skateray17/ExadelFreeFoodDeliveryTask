import './usersScreen.css';
import Handlebars from 'handlebars';
import template from './usersScreen.hbs';
import Header from '../../components/header/header.js';

export default class UsersScreen{

  constructor(){

  }

  render(target, props){
    let html = template();
    let header = new Header();
    let child = header.render(target, props);
    target.innerHTML = child + html;
    // let childItem = new Child
    // child.render(place_to_put, properties)
    return child + html;
  }
  
}