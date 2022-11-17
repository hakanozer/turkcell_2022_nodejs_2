import events from 'events'

export const emitter = new events.EventEmitter()

export enum EmitEnum {
    add='add',
    remove='remove',
    equals="equals",
    size="size",
    session="session"
}

let size = 0
const fncAdd = (count: number) => {
    size = size + count
    console.log("Size Add: ", size);
}

const fncRemove = ( count: number ) => {
    size = size - count
    console.log("Size Remove: ", size);
}

const fncEquals = ( count: number ) => {
    size = count
    console.log("Size Equals: ", size);
}

export const fncSize = () => {
    console.log("Size: ", size);
}

export const fncSessionPlus = (req: any ) => {
    const size = req.session.size
    req.session.size = size + 1
    console.log( req.session.size );
}

emitter.addListener(EmitEnum.add, fncAdd)
emitter.addListener(EmitEnum.remove, fncRemove)
emitter.addListener(EmitEnum.equals, fncEquals)
emitter.addListener(EmitEnum.size, fncSize)
emitter.addListener(EmitEnum.session, fncSessionPlus)
