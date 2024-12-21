class Character {
    _life = 1
    maxLife = 1
    attack = 0
    defense = 0

    constructor(name) {
        this.name = name
    }

    get life () {
        return this._life
    }

    set life (newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name)
        this.life = 100
        this.maxLife = this.life
        this.attack = 10
        this.defense = 7
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name)
        this.life = 100
        this.maxLife = this.life
        this.attack = 9
        this.defense = 12
    }
}

class Monster extends Character {
    constructor() {
        super('Monster')
        this.life = 150
        this.maxLife = this.life
        this.attack = 15
        this.defense = 2
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster')
        this.life = 50
        this.maxLife = this.life
        this.attack = 3
        this.defense = 11
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1
        this.fighter1El = fighter1El
        this.fighter2 = fighter2
        this.fighter2El = fighter2El
        this.log = logObject
    }

    start() {
        this.update()

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () =>  this.doAttack(this.fighter1, this.fighter2))

        this.fighter2El.querySelector('.attackButton').addEventListener('click', () =>  this.doAttack(this.fighter2, this.fighter1))
    }

    update() {
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)}HP`
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`


        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)}HP`
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    }

    doAttack(attacking, attacked) {
        if(attacking.life > 0 && attacked.life <= 0) {
            this.log.addMessage(`Você não pode mais atacar, ${attacked.name} já está morto.`)
            return
        } else if (attacked.life > 0 && attacking.life <= 0) {
            this.log.addMessage(`Você está morto, não pode atacar.`)
            return
        }

        let attackFactor = (Math.random() * 2).toFixed(2)
        let defenseFactor = (Math.random() * 2).toFixed(2)


        let actualAttack = attacking.attack * attackFactor
        let actualDefese = attacked.defense * defenseFactor

        if(actualAttack <= actualDefese) {
            this.log.addMessage(`${attacked.name} defendeu.`)
        } else {
            attacked.life -= actualAttack

            this.log.addMessage(`${attacking.name} atacou ${attacked.name} e tirou ${actualAttack.toFixed(2)}HP.`)
        }
        this.update()
    }
}

class Log {
    list = []

    constructor(listEl) {
        this.listEl = listEl
    }

    addMessage(msg) {
        this.list.push(msg)
        this.render()
    }

    render() {
        this.listEl.innerHTML = ''

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}
