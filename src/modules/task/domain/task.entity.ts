export class Task {
    constructor(
        readonly _id: string,
        public title: string,
        public desc: string,
        public isCompleted: boolean
    ) {}
}
