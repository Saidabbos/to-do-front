export class Plan {
  id: number;
  author: number;
  done: boolean;
  name: string;
  editable: boolean;
  saving: boolean;
  constructor() {
    this.done = false;
  }
}
