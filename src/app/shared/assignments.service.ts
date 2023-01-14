import { Injectable, ɵɵNgOnChangesFeature } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { dataPourPeuplerBD } from './data';
import { HttpService } from './http.service'
@Injectable({
    providedIn: 'root',
})
export class AssignmentsService {
    constructor(
        private loggingService: LoggingService,
        private http: HttpService
    ) {}

    uri = '/assignments' // URI du web service

    getAssignments(page: number, limit: number): Observable<Assignment[]> {
        //return of(this.assignments);
        return this.http.get<Assignment[]>(
            `/assignments?page=${page}&limit=${limit}`
        )
    }

    rendreAssignment(id:string){
        return this.http.put(`/assignments/${id}/rendre`)
    }

    searchAssignments(query: string): Observable<Assignment[]> {
        //return of(this.assignments.filter(a => a.nom.includes(searchTerm)));
        return this.http.get<Assignment[]>(`${this.uri}/search?nom=${query}`)
    }

    getAssignment(id: number): Observable<Assignment | undefined> {
        /*const a:Assignment|undefined =
           this.assignments.find(a => a.id === id);

    return of(a);*/
        return this.http.get<Assignment>(`${this.uri}/${id}`)
    }

    addAssignment(assignment: Assignment): Observable<any> {
        //this.assignments.push(assignment);
        // ex utilisation du service de log
        this.loggingService.log(assignment.nom, 'ajouté')

        //return of("Assignment ajouté");
       // return this.http.post(this.uri, assignment)
        //return this.http.post(this.uri, assignment)
        return this.http.post(`${this.uri}/`, assignment)
        return this.http.post<Assignment>(this.uri, assignment)
    }

    deleteAssignment(assignment: Assignment): Observable<any> {
        /*const position = this.assignments.indexOf(assignment);
    this.assignments.splice(position,1);
  */
        // ex utilisation du service de log
        this.loggingService.log(assignment.nom, 'supprimé')

        //return of("Assignment supprimé");
        return this.http.delete<string>(`${this.uri}/${assignment._id}`)
    }

    updateAssignment(assignment: Assignment): Observable<any> {
        // Rien à faire pour le moment, plus tard
        // il faudra faire une requête HTTP PUT
        // sur un web service distant etc.

        // ex utilisation du service de log
        this.loggingService.log(assignment.nom, 'modifié')

        //return of("Assignment modifié");
        return this.http.put<Assignment>(this.uri, assignment)
    }

    peuplerBD() {
        dataPourPeuplerBD.forEach((a) => {
            let nouvelAssignment = new Assignment()
            nouvelAssignment.id = a.id
            nouvelAssignment.nom = a.nom
            nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu)
            nouvelAssignment.rendu = a.rendu
            //nouvelAssignment.note = a.note
            //nouvelAssignment.remarque = a.remarque
    

            this.addAssignment(nouvelAssignment).subscribe((msg) => {
                console.log(msg)
            })
        })
    }

    
}
