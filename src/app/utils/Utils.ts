import { ResponseStruct } from '../estructuras/response';
import { RequestStruct } from '../estructuras/request';
import { MapValues } from "../estructuras/map.values";
import { Injectable } from "@angular/core";
import { ResponseRowset } from '../estructuras/responseRowset';

@Injectable()
export class Utils {

    generarFormatRequest(requerimiento: RequestStruct): string {
        let formatInicio: string = '\n<fmtdef id="' + requerimiento.idRequest + '">\n\t';
        let header: string = '<bsvreq>\n\t\t<header>\n\t\t\t<usuario>${header.userName}</usuario>\n\t\t\t<password>${header.userPassword}</password>\n\t\t\t' +
        '<canal>${header.channel}</canal>\n\t\t\t<trxid>${header.trxId}</trxid>\n\t\t\t<requerimiento>' + requerimiento.request + '</requerimiento>\n\t\t' +
        '</header>\n\t\t';
        let dataInicio: string = '<data>\n';
        let dataFin: string = '\t\t</data>\n\t';
        let formatFin: string = '</bsvreq>\n</fmtdef>';
        return (formatInicio + header + dataInicio + this.generarData(requerimiento.data, 'data') + dataFin + formatFin);
    }

    generarFormatResponse(response: ResponseStruct): string {
        let formatInicio: string = '\n<fmtdef id="' + response.idResponse + '">\n\t';
        let header: string = '<bsvrsp>\n\t\t<header map="responseHeader" class="com.midd.bean.ResponseHeader">\n\t\t\t' + 
        '<resultado>${responseHeader.result}</resultado>\n\t\t\t<aviso>\n\t\t\t\t<codigo>${responseHeader.warningCode}</codigo>\n\t\t\t\t' + 
        '<mensaje>${responseHeader.warningMessage}</mensaje>\n\t\t\t</aviso>\n\t\t\t<error>\n\t\t\t\t<codigo>${responseHeader.errorCode}</codigo>\n\t\t\t\t' + 
        '<mensaje>${responseHeader.errorMessage}</mensaje>\n\t\t\t</error>\n\t\t\t<fecha>${responseHeader.date}</fecha>\n\t\t\t' + 
        '<hora>${responseHeader.time}</hora>\n\t\t\t<nombre>${responseHeader.instanceName}</nombre>\n\t\t</header>\n\t\t';
        let dataInicio: string = '<data map="${responseData}" class="' + response.responseClassName + '">\n';
        let data: string = this.generarData(response.data, 'responseData');
        let rowset: string = '';
        if(response.tieneRowset){
            rowset = this.generarRowset(response.rowset);
        }
        let dataFin: string = '\t\t</data>\n\t';
        let formatFin: string = '</bsvrsp>\n</fmtdef>';
        return (formatInicio + header + dataInicio + data + rowset + dataFin + formatFin);
    }

    private generarRowset(rowset: ResponseRowset): string {
        let inicio: string = '\t\t\t<general>\n\t\t\t\t<rowset list="${responseData.rowset}">\n\t\t\t\t\t';
        let rowDefine: string = '<row map="${responseData.rowset[?]}" class="' + rowset.rowsetClassName + '">\n';
        let dataRow: string = this.generarDataRowset(rowset.rowset);
        let fin: string = '\t\t\t\t\t</row>\n\t\t\t\t</rowset>\n\t\t\t</general>\n';
        return (inicio + rowDefine + dataRow + fin);
    }

    private generarDataRowset(tags: MapValues[]): string {
        let mapeoData: string = '';
        if(this.isNotNull(tags)) {
            tags.forEach(
                t => {
                    mapeoData = mapeoData + '\t\t\t\t\t\t<' + t.tag + '>${responseData.rowset[?].' + t.atributo + '}</' + t.tag + '>\n';
                }
            );
        }
        return mapeoData;
    }

    /**
     * Dado el array de tags genera el mapeo de la data
     */
    private generarData(tags: MapValues[], tagSegunMapeo: string): string {
        let mapeoData: string = '';
        if(this.isNotNull(tags)){
            tags.forEach(
                t => {
                    mapeoData = mapeoData + '\t\t\t<' + t.tag + '>${' + tagSegunMapeo + '.' + t.atributo + '}</' + t.tag + '>\n'
                }
            );
    
        }
        return mapeoData;
    }

    /**
     * Retorna true si el array esta vacio
     * @param array 
     */
    private isNotNull(array: MapValues[]): boolean {
        return (array != undefined);
    }

    //BEAN

    generarBeanResponse(resp: ResponseStruct): string {
        let atributos: string = this.generarAtributos(resp.data, resp.rowset);
        let getters: string = this.generarGetters(resp.data, resp.rowset);
        let setters: string = this.generarSetters(resp.data, resp.rowset);
        let toString: string = this.generarToStringResp(resp);  
        return (atributos + getters + setters + toString);
    }

    generarBeanRequest(req: RequestStruct): string {
        let atributos: string = this.generarAtributos(req.data, null);
        let getters: string = this.generarGetters(req.data, null);
        let setters: string = this.generarSetters(req.data, null);
        let toString: string = this.generarToStringReq(req);  
        return (atributos + getters + setters + toString);
    }

    private generarSetters(data: MapValues[], rowset: ResponseRowset): string {
        let mapeo: string = '';
        if(this.isNotNull(data)) {
            data.forEach(
                e => mapeo = mapeo + '\tpublic void set' + e.atributo + '(String ' + e.atributo + ') {\n\t\tthis.' + e.atributo + ' = ' + e.atributo + ';\n\t}\n'
            );
            if(rowset != null) {
                mapeo = mapeo + '\tpublic void setRowset(List<' + rowset.rowsetClassName + '> rowset) {\n\t\tthis.rowset = rowset;\n\t}\n';
            }
        }
        return mapeo;
    }

    private generarGetters(data: MapValues[], rowset: ResponseRowset): string {
        let mapeo: string = '';
        if(this.isNotNull(data)) {
            data.forEach(
                e => mapeo = mapeo + '\tpublic String get' + e.atributo + '() {\n\t\treturn ' + e.atributo + ';\n\t}\n'
            );
            if(rowset != null) {
                mapeo = mapeo + '\tpublic List<' + rowset.rowsetClassName + '> getRowset() {\n\t\treturn this.rowset;\n\t}\n';
            }
        }
        return mapeo;
    }

    private generarAtributos(data: MapValues[], rowset: ResponseRowset): string {
        let mapeo: string = '';
        if(this.isNotNull(data)) {
            data.forEach(
                e => mapeo = mapeo + '\tprivate String ' + e.atributo + ' = null;\n'
            );
            if(rowset != null) {
                mapeo = mapeo + '\tprivate List<' + rowset.rowsetClassName + '> rowset = new ArrayList<' + rowset.rowsetClassName + '>();\n';
            }
        }
        return mapeo;
    } 

    private generarToStringReq(req: RequestStruct): string {
        let mapeo: string = '\t@Override\n\tpublic String toString() {\n\t\tStringBuilder builder = new StringBuilder();\n\t\t' + 
        'builder.append("' + req.request + '[");\n';
        if(this.isNotNull(req.data)) {
            req.data.forEach(
                e => mapeo = mapeo + '\t\t\tif(' + e.atributo + ' != null) {\n\t\t\t\tbuilder.append("' + e.atributo + '=");\n\t\t\t\tbuilder.append(' + e.atributo + ');\n\t\t\tbuilder.append(", ");\n\t\t}\n'
            );
        }
        mapeo = mapeo + '\t\tbuilder.append("]");\n\t\treturn builder.toString();\n\t}';
        return mapeo;
    } 

    private generarToStringResp(resp: ResponseStruct): string {
        let mapeo: string = '\t@Override\n\tpublic String toString() {\n\t\tStringBuilder builder = new StringBuilder();\n\t\t' + 
        'builder.append("' + resp.responseClassName + '[");\n';
        if(this.isNotNull(resp.data)) {
            resp.data.forEach(
                e => mapeo = mapeo + '\t\t\tif(' + e.atributo + ' != null) {\n\t\t\t\tbuilder.append("' + e.atributo + '=");\n\t\t\t\tbuilder.append(' + e.atributo + ');\n\t\t\t\tbuilder.append(", ");\n\t\t}\n'
            );
        }
        if(resp.tieneRowset) {
            mapeo = mapeo + '\t\t\tif(rowset != null) {\n\t\t\t\tbuilder.append("rowset=");\n\t\t\t\tbuilder.append(rowset);\n\t\t\t\tbuilder.append(", ");\n\t\t}\n'
        }
        mapeo = mapeo + '\t\tbuilder.append("]");\n\t\treturn builder.toString();\n\t}';
        return mapeo;
    } 

    //SCHEMA
    generarSchemaRequest(request: RequestStruct): string {
        let schema: string = '{\n"$schema": "http://json-schema.org/draft-04/schema#",\n' + 
        '"additionalProperties": false,\n"title": "NOMBRE CLASE REQUEST",\n"description": "NOMBRE CLASE REQUEST",\n' + 
        '"id": "http://UBICACION REQUEST JSON/NOMBRE CLASE REQUEST.json",\n"properties": {\n\t';
        let properties: string = this.generarSchemaProperties(request.data);
        let fin: string = '\r},\n\t"required": [\n\t],\n\t"type": "object"\n}';
        return schema + properties + fin;
    }

    private generarSchemaProperties(data: MapValues[]): string {
        let properties: string = '';
        if(this.isNotNull(data)) {
            data.forEach(
                e => properties = properties + '"' + e.atributo + '": {\n\t\t"id": "/properties/' + e.atributo + '",\n\t\t"type": "string"\n\t},\n\t'
            );
        }
        return properties.substring(0, properties.length - 3);
    }

    //V-Json
    generarVJson(response: ResponseStruct): string {
        let header: string = '{\n\t"header":\n\t{\n\t\t"result": "$!responseHeader.result",\n\t\t"error":\n\t\t\t{\n\t\t\t\t' +
        '"code": "$!responseHeader.errorCode"\n\t\t\t},\n\t\t"warning":\n\t\t\t{\n\t\t\t\t"code": "$!responseHeader.warningCode"\n\t\t\t' +
        '},\n\t\t"date": "$!responseHeader.date",\n\t\t"time": "$!responseHeader.time",\n\t\t"instanceName": "$!responseHeader.instanceName"\n\t' + 
        '},\n\t"data":\n\t{\n';
        let data: string = this.generarDataVjson(response.data);
        let rowset: string = '';
        if(response.tieneRowset) {
            rowset = this.generarDataRowsetVjson(response.rowset) + '\n\t\t\t\t}#if( $velocityHasNext ), #end\n\t\t\t#end\n\t\t]\n';
        }else {
            data = data.substring(0, data.length - 2) + '\n';
        }
        let fin: string = '\t}\n}';
        return (header + data + rowset + fin);
    }

    private generarDataRowsetVjson(data: ResponseRowset): string {
        let mapeo: string = '\t\t"' + data.rowsetClassName + 'Count": "$!responseData.' + data.rowsetClassName + 'Count",\n' +
        '\t\t"rowset":[\n\t\t\t#foreach ($row in $responseData.rowset)\n\t\t\t\t{\n';
        if(this.isNotNull(data.rowset)) {
            data.rowset.forEach(
                tag => mapeo = mapeo + '\t\t\t\t\t"' + tag.atributo + '":"${row.' + tag.atributo + '}",\n'
            );
        }
        return mapeo.substring(0, mapeo.length - 2);
    }

    private generarDataVjson(data: MapValues[]): string {
        let mapeo: string = '';
        if(this.isNotNull(data)) {
            data.forEach(
                tag => mapeo = mapeo + '\t\t"' + tag.atributo + '": "$!responseData.' + tag.atributo + '",\n'
            );
        }
        return mapeo;
    }
}