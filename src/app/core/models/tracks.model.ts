import { ArtistModel } from "./artist.model";
import { DurationModel } from "./duration.model";

export interface TrackModel {
    name: string;
    album: string;
    cover: string;
    url: string;
    date: string;
    _id: number;
    duration: DurationModel;
    artist?: ArtistModel;
    time: string;
}