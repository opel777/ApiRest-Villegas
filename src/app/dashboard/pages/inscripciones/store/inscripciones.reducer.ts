import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionWithCursoAndAlumno } from '../model';
import { Alumno } from '../../alumnos/model';
import { Cursos } from '../../cursos/model';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  data: InscripcionWithCursoAndAlumno[];
  alumnoOptions:Alumno[],
  cursoOptions:Cursos[],
  loading:boolean;
  error:unknown

}

export const initialState: State = {
data:[],
alumnoOptions:[],
cursoOptions:[],
loading:false,
error:null
};

export const reducer = createReducer(
  initialState,

  on(InscripcionesActions.loadInscripciones, state => {
    return {
      ...state,
      loading:true
    }
  }),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading:false
    }
  }),
  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading:false
    }
  }),
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});
