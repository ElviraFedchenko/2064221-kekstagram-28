import { renderPicturesDetals} from './big-picture.js';
import { onDocumentKeydown } from './form.js';
import { isEscapeKey } from './utils.js';
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureOpenElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureOpenElement.querySelector('.big-picture__cancel');


const renderGallery = (pictures) => {
  const miniaturePictures = pictures;
  miniaturePictures.forEach(({ url, description, likes, comments, id }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.pictureElementId = id;

    container.querySelectorAll('.picture').forEach((element) => {
      element.remove();
    });
    fragment.appendChild(pictureElement);
  });

  container.addEventListener('click', (evt) => {
    const picture = evt.target.closest('[data-picture-element-id]');
    if (!picture) {
      return;
    }
    evt.preventDefault();

    const photo = pictures.find(
      (item) => item.id === + picture.dataset.pictureElementId
    );
    if (!photo) {
      return;
    }
    openBigPicture(photo);
  });
  container.appendChild(fragment);
};

function openBigPicture(photo) {
  bigPictureOpenElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPicturesDetals(photo);
}

function closeBigPicture() {
  bigPictureOpenElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  });
  document.removeEventListener('keydown', onDocumentKeydown);
}


bigPictureCloseElement.addEventListener('click', () => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  });
  closeBigPicture();
});

export { pictureTemplate, renderGallery};
