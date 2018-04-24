import './usersScreen.css';
import Handlebars from 'handlebars';
import template from './usersScreen.hbs';
import Header from '../../components/header/header.js';

export default class UsersScreen{

  constructor(){

  }

  render(target, props){
    let screen =  template();
    target.innerHTML = screen;
    let header = new Header();
    header.render(document.querySelector("#screen"), props);
    return header + screen; 
  }
  
}