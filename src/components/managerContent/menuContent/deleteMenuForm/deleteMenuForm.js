import deleteMenuTemplate from './deleteMenuForm.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class deleteMenuForm {
  render(target) {
    const uploadForm = createElementsFromString(deleteMenuTemplate());
    // const fileMsg = uploadForm.querySelector('.file-msg');
    // const fileInput = uploadForm.querySelector('.choose-file');
    // fileInput.addEventListener('change', () => {
    //   setFakeValue(fileMsg, fileInput);
    // });
    // const fileButton = uploadForm.querySelector('.fake-button');
    target.appendChild(uploadForm);
    return uploadForm;
  }
}
// function setFakeValue(fileMsg, fileInput) {
//   fileMsg.innerText = fileInput.files[0].name;
// }
