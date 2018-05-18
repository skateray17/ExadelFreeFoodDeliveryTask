import uploadMenuTemplate from './uploadMenuForm.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class uploadMenuForm {
  render(target) {
    const uploadForm = createElementsFromString(uploadMenuTemplate());
    console.log(target);
    target.appendChild(uploadForm);
    return uploadForm;
  }
}
