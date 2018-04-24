import './usersScreen.css';
// import Handlebars from 'handlebars';
import template from './usersScreen.hbs';
import Header from '../../components/header/header.js';
import * as utils from '../../common/utils.js';

export default class UsersScreen{

  constructor(){

  }

  render(target, props){

    let header = new Header();
    let headerResponse = header.render(target, props);
    let screen =  utils.createElementsFromString(template())[0];
    target.appendChild(screen);
    return [headerResponse, screen];
    
  }
  
}