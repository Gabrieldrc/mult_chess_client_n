import IPosition from "./Position.interface";

export default interface PieceInterface {
    name: string,
    player: number,
    position: IPosition,
    placeCanMove: Array<IPosition>
}