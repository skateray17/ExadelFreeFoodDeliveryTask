import './usersScreen.css';
// import Handlebars from 'handlebars';
import template from './usersScreen.hbs';
import Header from '../../components/header/header.js';
import { createElementsFromString } from '../../common/utils.js';

export default class UsersScreen{

  constructor(){

  }

  render(target, props){

    let header = new Header();
    header.render(target, props);
    let screen =  createElementsFromString(template())[0];
    target.appendChild(screen);
    return screen;
    
  }
  
}