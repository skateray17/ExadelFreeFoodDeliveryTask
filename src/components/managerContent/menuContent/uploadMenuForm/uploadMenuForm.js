import uploadMenuTemplate from './uploadMenuForm.hbs';
import { createElementsFromString } from '../../../../common/utils';

function setFakeValue(fileMsg, fileInput) {
  fileMsg.innerText = fileInput.files[0].name;
}

export default class uploadMenuForm {
  render(target) {
    const uploadForm = createElementsFromString(uploadMenuTemplate());
    const fileMsg = uploadForm.querySelector('.file-msg');
    const fileInput = uploadForm.querySelector('.choose-file');
    fileInput.addEventListener('change', () => {
      setFakeValue(fileMsg, fileInput);
    });
    const fileButton = uploadForm.querySelector('.fake-button');
    target.appendChild(uploadForm);
    return uploadForm;
  }
}

