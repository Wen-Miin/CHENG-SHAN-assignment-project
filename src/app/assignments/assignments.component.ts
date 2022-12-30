import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import * as _ from 'lodash'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
    titre = 'Liste des devoirs'
    page = 1
    limit = 5
    total = 0

    assignmentSelectionne!: Assignment

    assignments: Assignment[] = [] //tableau pour la liste des assignments

    constructor(private assignmentsService: AssignmentsService) {}

    ngOnInit(): void {
        console.log("appelé à l'initialisation du composant")
        this.assignmentsService
            .getAssignments(this.page, this.limit)
            .subscribe((assignments) => {
                {
                    this.assignments = _.get(assignments, 'data') || []
                    this.total = _.get(assignments, 'pagination.total') || 0
                }
            })
    }

    // Méthode appelée quand on clique sur un assignment
    assignmentClique(assignment: Assignment) {
        console.log('assignmentClique : ' + assignment.nom)
        this.assignmentSelectionne = assignment
    }

    pageChanged(event: PageEvent) {
        const { previousPageIndex, pageIndex, pageSize, length } = event

        this.assignmentsService
            .getAssignments(pageIndex + 1, pageSize)
            .subscribe((assignments) => {
                {
                    this.assignments = _.get(assignments, 'data') || []
                }
            })

        console.log(event)
    }
}
