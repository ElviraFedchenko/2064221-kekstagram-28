import { getPhoto } from './data.js';
import { isEscapeKey, renderPicturesDetals} from './big-picture.js';


const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const container = document.querySelector('.pictures');
const miniaturePictures = getPhoto();
const fragment = document.createDocumentFragment();
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');


miniaturePictures.forEach(({ url, description, likes, comments, id }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.pictureElementId = id;

  fragment.appendChild(pictureElement);
});

container.appendChild(fragment);

const bigPictureOpenElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureOpenElement.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture([0]);
  }
};

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const picture = evt.target.closest('[data-picture-element-id]');
    if (!picture) {
      return;
    }
    const photo = pictures.find(
      (item) => item.id === + picture.dataset.pictureElementId
    );
    openBigPicture(photo);
  });
};

function openBigPicture(photo) {
  bigPictureOpenElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPicturesDetals(photo);
}

function closeBigPicture() {
  bigPictureOpenElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}


bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

export { pictureTemplate, renderGallery };