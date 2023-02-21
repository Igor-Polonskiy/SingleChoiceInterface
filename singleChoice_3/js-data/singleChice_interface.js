const task = document.querySelector('.singleChoice_3_interface')
const elementForm = task.querySelector('.element')
const element = elementForm.querySelector('form')
const name = element.querySelector('.name')
const imgSrc = element.querySelector('.imgSrc')
const text = element.querySelector('.text')
const audioSrc = element.querySelector('.audioSrc')
const answerTag = element.querySelector('.answerTag')
const counterElements = task.querySelector('.counterElements')
const treiner = task.querySelector('.treiner')
const treinerForm = treiner.querySelector('form')
const rightAnswerValue = task.querySelector('.rightAnswer')
const orientationValue = task.querySelector('.select')
const textarea = task.querySelector('.textarea')


let arrayOfElements = []
let rightAnswer = ''
let orientation ='h'
let count = 0

elementForm.addEventListener('submit', (e) => {
    e.preventDefault();
    count++
    let obj = {}
    obj.id = count
    obj.name = name.value
    obj.imgSrc = imgSrc.value
    obj.text = text.value
    obj.audioSrc = audioSrc.value
    obj.answerTag = answerTag.value
    counterElements.innerText = count

    name.value = ''
    imgSrc.value = ''
    text.value = ''
    audioSrc.value = ''
    answerTag.value = ''

    arrayOfElements.push(obj)
    console.log(arrayOfElements)
})

treinerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    rightAnswer = rightAnswerValue.value
    orientation = orientationValue.value
    //console.log(orientationValue)

    textarea.innerHTML = `
    const taskId = "singleChoice_3_task-3";
    const arrayOfElements = ${JSON.stringify(arrayOfElements)}
    const rightAnswer = '${rightAnswer}'
    const orientation ='${orientation}'
    `

})