let log = new Log(document.querySelector('.log'))

let hero = new Knight('Augusto')
let monster = new Monster()


let stage = new Stage(
    hero,
    monster,
    document.getElementById('hero'),
    document.getElementById('monster'),
    log
)

stage.start()