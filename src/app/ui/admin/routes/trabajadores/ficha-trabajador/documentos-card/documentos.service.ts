import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Trabajador } from 'src/app/models';
import { StorageService } from 'src/app/services/storage.service';

export interface Documento {
    fileName: string,
    nombre: string,
    vencimiento?: {
        activo: boolean,
        fechaObj?: {
            year: number,
            month: number,
            day: number
        },
        fechaEpoch?: number
    },
    tipo: string,
    peso: number,
    url?: string    
}

@Injectable({
    providedIn: 'root'
})

export class DocumentosService {

    constructor(private firestore: FirestoreService, private storage: StorageService) { }

    subirDocumentos(trabajador: Trabajador, documentosPorSubir: any[]) {
        console.log(documentosPorSubir)

        return this.subirYDevolverConURL(documentosPorSubir)
            .then(documentos => {
                console.log("Todos los documentos han sido subidos",
                    "Ahora se agregará el siguiente arreglo a la lista de documentos en base de datos: ",
                    documentos
                );
                console.log("Modificando base de datos...")

                let documentosPrevios = trabajador.documentos ? [...trabajador.documentos] : [];
                this.firestore.set(
                    'trabajadores',
                    trabajador.rut,
                    { documentos: [...documentosPrevios, ...documentos] }
                )
            })
            .then(() => console.log("Base de datos modificada"))
            .catch(error => console.log(error))
    }

    subirYDevolverConURL(documentosPorSubir): Promise<Documento[]> {
        console.log("Comienza subida de documentos...")

        return Promise.all(documentosPorSubir.map(doc => {
            let filename = new Date().getTime() + '_' + doc.fileName;
            let storageRef = 'trabajadoresDocumentos/' + filename;
            return this.storage.put(storageRef, doc.file)
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(
                    url => {
                        delete doc.file;
                        doc.url = url;
                        doc.storageRef = storageRef;
                        console.log('Documento subido: ', doc);
                        return doc
                    }
                )
                .catch(error => console.log(error))
        }))
    }

    borrarDocumento(trabajador, index, storageRef) {
        let arreglo = trabajador.documentos ? [...trabajador.documentos] : [];
        arreglo.splice(index, 1);
        console.log("Documento a eliminar: indice " + index, arreglo)
        console.log("Modificando base de datos...")

        return this.firestore.set(
            'trabajadores',
            trabajador.rut,
            { documentos: arreglo }
        )
            .then(() => {
                console.log("Base de datos modificada");
                console.log("Eliminando de storage...");
                return this.storage.delete(storageRef)
            })
            .then(() => console.log("archivo eliminado de storage"))
            .catch(error => console.log(error))
    }


    editarDocumento(trabajador, index, nuevoDocumento) {
        let arreglo = trabajador.documentos ? [...trabajador.documentos] : [];
        arreglo[index] = { ...arreglo[index], ...nuevoDocumento }
        console.log("Documento a modificar: indice " + index)
        console.log("Modificando base de datos...")

        return this.firestore.set(
            'trabajadores',
            trabajador.rut,
            { documentos: arreglo }
        )
            .then(() => console.log("documento modificado."))
            .catch(error => console.log(error))
    }


}
