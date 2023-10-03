export interface ICommandType {
    additional_commands: IAdditionalCommandType[];
    options: IOptionsType[];
}

export interface IAdditionalCommandType {
    label: string;
    about: string;
}

export interface IOptionsType {
    label: string;
    about: string;
    value: string;
    data?: IDataType[];
}

export interface IDataType {
    label: string;
    value: string;
    url?:  string;
}