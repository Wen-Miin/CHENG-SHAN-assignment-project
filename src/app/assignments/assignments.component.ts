import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import * as _ from 'lodash'
import { PageEvent } from '@angular/material/paginator'
import * as moment from 'moment'
import { ActivatedRoute, Router } from '@angular/router'

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

    constructor(
        private assignmentsService: AssignmentsService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        console.log("appelé à l'initialisation du composant")

        // get the page and limit query parameters

        this.activatedRoute.queryParams.subscribe((params) => {
            // Get the page and limit query parameters
            this.page = +params['page'] || 1
            this.limit = +params['limit'] || 5
            this.assignmentsService
                .getAssignments(this.page, this.limit)
                .subscribe((assignments) => {
                    {
                        this.assignments = _.get(assignments, 'data') || []
                        this.total = _.get(assignments, 'pagination.total') || 0
                    }
                })
        })
    }

    // Méthode appelée quand on clique sur un assignment
    assignmentClique(assignment: Assignment) {
        console.log('assignmentClique : ' + assignment.nom)
        this.assignmentSelectionne = assignment
    }

    // Méthode quand on change de page 
    pageChanged(event: PageEvent) {
        const { previousPageIndex, pageIndex, pageSize: limit, length } = event

        const page = pageIndex + 1

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { page, limit },
        })

        console.log(event)
    }

    verifyDateTooLate(date: Date, rendu: boolean) {
        return moment(date).isBefore(moment()) && !rendu
    }

}
