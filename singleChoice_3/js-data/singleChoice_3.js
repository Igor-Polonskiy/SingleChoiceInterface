import {
  scaleImage,
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  removeActiveCardClass,
  addCheckClass,
  addRightChoiceClass,
  addWrongChoiceClass,
  onSoundIconClick,
  resetSound,
  getRandomPositionToCard,
  shuffleCards,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../../_common_files/common_scripts.js";
 //import {id} from './singleChoice_interface.js';
 const showGlobalId = document.querySelector('.showGlobalId')
 showGlobalId.addEventListener('click',()=>{
  console.log(`https://backendforsimuliators-production.up.railway.app/singlechoice_3/${globalid}`);
  fetch(`https://backendforsimuliators-production.up.railway.app/singlechoice_3/${globalid}`, {
  //fetch('https://webhook.site/544f3b75-4fda-431a-ae29-d022472cada3', {
    
  })
      .then((response) => response.json())
      .then((result) => {
          console.log('Success:', result.template);
          //elements = result
          
            // это уникальный id для данного задания, который был присвоен в html
            const taskId = "singleChoice_3_task-3";
            // массив входящих картинок (максимум 5-6 элементов),
            // поле text, audioSrc  заполняется по необходимости, если надписи или звука нет, то ставится ''
            // в поле answerTag указывается уникальное слово или цифра, по которой будет сверяться правильный ответ
            // в поле id указывается уникальная цифра, по которым воспроизводятся звуки
            // imgSrc -  обязательное поле, путь к картинке
          
           
          
            const arrayOfElements =result.template.arrayOfElements
            arrayOfElements.forEach((item,index)=>{
              item.imgSrc = `https://backendforsimuliators-production.up.railway.app${result.template.arrayOfElements[index].imgSrc}`
            })
          
            // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
            const rightAnswer = result.template.rightAnswer;
            // заполняется для правильного отображения сетки
            // 'h' -  ставится, если поля расположены в несколько столбцов
            // 'v' - если поля должны быть расположены строго в столбик друг под другом (максимум 5 элементов)
            // const orientation = "v";
            const orientation = result.template.orientation;
            // сама функция, которая запускается, здесь ничего менять не нужно
        
            renderSingleChoice_3(arrayOfElements, rightAnswer, taskId, orientation);
          
          
      })
      .catch((error) => {
          console.error('Error:', error);
      });
      

// ВЫЗОВ ФУНКЦИИ ДЛЯ СЛУЧАЯ ТОЛЬКО КАРТИНКА И ЗВУК
 })

let idTask

  idTask = globalid
  console.log(idTask)


// ВЫЗОВ ФУНКЦИИ ДЛЯ СЛУЧАЯ КАРТИНКА + ЗВУК + ТЕКСТ





// НИЖЕ САМА ФУНКЦИЯ
function renderSingleChoice_3(
  arrayOfElements,
  rightAnswer,
  taskId,
  orientation
) {
  let currentActiveCard;
  let isGameStart = false;

  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };

  const arrayLength = arrayOfElements.length;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const listContainer = taskWrapper.querySelector(".singleChoice_3_List");

  orientation === "v" &&
    listContainer.parentElement.classList.add(
      "singleChoice_3_Wrapper_vertical"
    );

  listContainer.insertAdjacentHTML(
    "beforeend",
    createPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );

  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  listContainer.addEventListener("pointerdown", onListItemClick);

  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  const audioFiles = taskWrapper.querySelectorAll(".singleChoice_3_audio");

  function onBtnResetClick(e) {
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }

    currentActiveCard && removeActiveCardClass(currentActiveCard);

    [...listContainer.children].forEach((el) => getRandomPositionToCard(el));

    resetSound(soundSetStates);
    checkingAnswerReset(controlsBox, infoBox);
    currentActiveCard = null;

    listContainer.addEventListener("pointerdown", onListItemClick);
  }

  function onBtnTestClick(e) {
    if (currentActiveCard && currentActiveCard.dataset.name === rightAnswer) {
      addRightChoiceClass(currentActiveCard);
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      addWrongChoiceClass(currentActiveCard);
      checkingAnswerNegative(controlsBox, infoBox);
    }

    resetSound(soundSetStates);

    listContainer.removeEventListener("pointerdown", onListItemClick);
  }

  function createPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        let widthItem;
        let heightItem = `"height: calc(100% / ${arrayLength} - 10px)"`;

        if (arrayLength > 4) {
          widthItem = `"width: calc(100% / 3 - 10px)"`;
        } else if (arrayLength < 4) {
          widthItem = `"width: calc(100% / ${arrayLength} - 10px)"`;
        } else if (arrayLength === 4) {
          widthItem = `"width: calc(100% / 2 - 10px)"`;
        }

        const isTitle =
          picture.text &&
          `<div class='singleChoice_3_Title'>${picture.text}</div>`;

        const isSound =
          picture.audioSrc &&
          `
                  <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${picture.id}${taskId}">
                      <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                      <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                      <audio class="singleChoice_3_audio" id="${picture.id}${taskId}" src="${picture.audioSrc}">
                                Your browser does not support the
                                <code>audio</code> element.
                      </audio>
                  </div>
              `;
        if (orientation === "h") {
          return `
                          <div class="singleChoice_3_Item oneMultiChoice_border" data-name="${picture.answerTag}" style=${widthItem}>
                              <div class='singleChoice_3_ImageBox singleChoice_3_ImageBox_horizontal' style="background-image: url(${picture.imgSrc})">
                                 <div class="zoom_open_button_white singleChoice_3_enlarge_picture" title="Увеличить изображение">
                                    <div class="icon_zoomPicture whiteZoomImg"></div>
                                 </div>
                              </div>
                              ${isSound}
                              ${isTitle}
                              </div>
                              `;
        } else if (orientation === "v") {
          let isText = picture.text
            ? "singleChoice_3_ImageBox_vertical_withText"
            : "singleChoice_3_ImageBox_vertical";
          return `
                <div class="singleChoice_3_Item oneMultiChoice_border singleChoice_3_Item_vertical" data-name="${picture.answerTag}" style=${heightItem}>
                ${isSound}
                ${isTitle}
                    <div class='singleChoice_3_ImageBox ${isText}' style="background-image: url(${picture.imgSrc})">
                       <div class="zoom_open_button_white singleChoice_3_enlarge_picture" title="Увеличить изображение">
                          <div class="icon_zoomPicture whiteZoomImg"></div>
                       </div>
                    </div>
                    </div>
                    `;
        }
      })
      .join("");
  }

  function onListItemClick(e) {
    let imgEl;
    if (e.target.classList.contains("singleChoice_3_enlarge_picture")) {
      scaleImage(e.target.parentElement);
    }
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
    const isImgEl =
      e.target.classList.contains("singleChoice_3_ImageBox") ||
      e.target.classList.contains("singleChoice_3_Title") ||
      e.target.classList.contains("singleChoice_3_Item");

    if (!isImgEl) {
      return;
    }

    if (
      e.target.classList.contains("singleChoice_3_ImageBox") ||
      e.target.classList.contains("singleChoice_3_Title")
    ) {
      imgEl = e.target.parentElement;
    } else imgEl = e.target;

    if (!isGameStart) {
      // открываем кнопку ПРОВЕРИТЬ
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = true;
    }

    if (imgEl.classList.contains("targetChoice_color")) {
      removeActiveCardClass(imgEl);
      // закрываем кнопку ПРОВЕРИТЬ
      isGameStart = false;
      toggleOpacityAndEventsElement(btnTest);
    } else if (imgEl.classList.contains("singleChoice_3_Item")) {
      currentActiveCard && removeActiveCardClass(currentActiveCard);
      addCheckClass(imgEl);
      currentActiveCard = imgEl;
    }
  }
}
