import { ObjectId } from "mongodb";

export default interface Account {
    _id?: ObjectId,
    email: string,
    username: string,
    password: string,
    ourPokemon: Pokemon[],
    character_name: string,
    badges: string[],
    bank: number,
    doneWithTutorial: boolean,
    opponents: Opponent[],
}

export interface Opponent{
    name: string,
    pokemon: Pokemon[],
    defeated: boolean
}

export interface Pokemon {
    active: boolean,
    id: number,
    level: number,
    gender: string,
    current_hp: number,
    base_experience: number,
    moves: Moves[],
    name: string,
    species: {
        url: string
    },
    sprites: Sprites,
    stats: Stat[],
    types: Type[]
}

interface Moves {
    move: {
        name: string,
        url: string
    },
    version_group_details: [
        {
            level_learned_at: number,
            move_learn_method: {
                name: string
            },
            version_group: {
                name: string
            }
        }
    ]
}

/* interface Move {
    id: number,
    name: string,
    accuracy: number,
    pp: number,
    power: number,
    damage_class: {
        name: string
    },
    meta: {
        ailment: {
            name: string
        }
    }
    type: {
        name: string
    }
} */

interface Sprites {
    back_default: string,
    back_female: string,
    front_default: string,
    front_female: string
}

interface Stat {
    base_stat: number,
    stat: {
        name: string
    }
}

interface Type {
    type: {
        name: string,
    }
}