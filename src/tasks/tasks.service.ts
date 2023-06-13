import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Schiff entern',
      description: 'Das Schiff von der englischen Flotte entern.',
      priority: 5,
      destination: 'Bermuda Dreieck',
      done: false,
      type: 'entern',
      gold: 1000,
    },
    {
      id: '2',
      title: 'Schatz suchen',
      description: 'Wo ist mein verfluchter Schatz?',
      priority: 1,
      destination: 'Nassau',
      done: false,
      type: 'suchen',
      gold: 100,
    },
    {
      id: '3',
      title: 'Barmann erpressen',
      description:
        'Der Kerl hat letzte Woche etwas unanständiges gemacht und ich habe es gesehen!',
      priority: 3,
      destination: 'Bar',
      done: false,
      type: 'erpressen',
      gold: 50,
    },
  ];

  /**
   * Get all tasks.
   * @param done optional - filter done tasks
   * @returns Task[]
   */
  getAll(done?: boolean): Task[] {
    if (done === true) {
      return this.tasks.filter((t) => t.done);
    }

    if (done === false) {
      return this.tasks.filter((t) => !t.done);
    }

    return this.tasks;
  }

  /**
   * Get a single task
   * @param id id, for which a task should be found
   * @returns Task
   */
  getOne(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  /**
   * Creates a task
   * @param task task that should be created
   * @returns Task
   */
  create(task: Task): Task {
    this.validate(task);
    task.id = uuidv4();
    this.tasks.push(task);
    return task;
  }

  /**
   * Updates a task
   * @param task task that should be updated
   * @returns Task
   */
  update(task: Task): Task {
    this.validate(task);
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index >= 0) {
      this.tasks[index] = task;
    } else {
      throw new BadRequestException(`Could not find a task with id ${task.id}`);
    }
    return task;
  }

  /**
   * Method to change the done status (it is also possible to do that with the update() method)
   * @param id id of the task which should be set to done
   * @returns Task
   */
  done(id: string): Task {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index >= 0) {
      this.tasks[index].done = true;
      return this.tasks[index];
    }

    throw new BadRequestException(`Could not find a task with id ${id}`);
  }

  private validate(task: Task): void {
    if (!task.title?.trim()) {
      throw new BadRequestException('title is missing');
    }

    if (!task.type) {
      throw new BadRequestException('type is missing');
    }

    if (task.gold > 1000000) {
      throw new BadRequestException(
        'too much gold (>1.000.000) is not allowed',
      );
    }

    if (task.priority > 5 || task.priority < 0) {
      throw new BadRequestException('priority can be only between 0 and 5');
    }
  }
}
