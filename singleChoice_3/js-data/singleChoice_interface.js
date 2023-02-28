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
let orientation = 'h'
let count = 0
let formData1 = new FormData()
window['globalid'] = '';


elementForm.addEventListener('submit', (e) => {
    e.preventDefault();
    count++
    let obj = {}
    obj.id = count
    obj.name = name.value
    obj.imgSrc = ''
    obj.text = text.value
    obj.audioSrc = ''
    obj.answerTag = answerTag.value
    counterElements.innerText = count

    //let formData2 = new FormData()
    //let arr = [{name:"name",value:"value"},{name:"name",value:"value"}]

    //formData2.append('id', count)
    // formData2.append('name', name.value)
    formData1.append(`imgSrc`, imgSrc.files[0])
    //formData2.append('arr', JSON.stringify(arr))
    if (audioSrc.files[0]) {
        formData1.append('audioSrc', audioSrc.files[0])
    }

    /* for (var pair of formData2.entries()) {
         console.log(pair[0] + ', ' + pair[1]);
     }*/


    name.value = ''
    imgSrc.value = ''
    text.value = ''
    audioSrc.value = ''
    answerTag.value = ''

    /*for (var pair of formData1.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }*/
    arrayOfElements.push(obj)
    console.log(arrayOfElements)

    /* fetch('https://webhook.site/544f3b75-4fda-431a-ae29-d022472cada3', {
         method: 'POST',
         body: formData2,
     })
         .then((response) => response.json())
         .then((result) => {
             console.log('Success:', result);
         })
         .catch((error) => {
             console.error('Error:', error);
         });*/
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

    formData1.append('arrayOfElements', JSON.stringify(arrayOfElements))
    formData1.append('taskId', "singleChoice_3_task-3")
    formData1.append('rightAnswer', rightAnswer)
    formData1.append('orientation', orientation)
    formData1.append("function", "renderSingleChoice")
    formData1.append("simuliatorName", "singleChoice_3")

    for (var pair of formData1.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    console.log(JSON.stringify(formData1.get('arrayOfElements')))
    console.log(arrayOfElements)
    fetch('https://backendforsimuliators-production.up.railway.app/singlechoice_3', {
        //fetch('https://webhook.site/544f3b75-4fda-431a-ae29-d022472cada3', {
        method: 'POST',
        body: formData1,
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            console.log(result.singleChoice._id)
            globalid = result.singleChoice._id

        })
        .catch((error) => {
            console.error('Error:', error);
        });
})




