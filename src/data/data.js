
import publications from './files/publications.json';
import certifications from './files/certifications.json';
import software from './files/software.json';
import skills from './files/skills.json';
import teaching from './files/teaching.json';
import scientific_activities from './files/scientific_activities.json';
import hobbies  from './files/hobbies.json';
import socials from './files/socials.json';
import contributing from './files/contributing.json';


class Directory {
    constructor(name, parentDirectory, content=[]) {
        this.name = name;
        this.content = content;
        this.parentDirectory = parentDirectory;
    }

    addContent(content) {
        this.content.push(content);
    }

    clone() {
        return new Directory(this.name, this.parentDirectory, this.content.map((item) => item.clone()));
    }
}

class File {
    constructor(id, content, parentDirectory=null) {
        this.name = id;
        this.content = content;
        this.parentDirectory = parentDirectory;
    }
    clone() {
        return new File(this.name, this.content, this.parentDirectory);
    }

    getFilePath(){
        return  this.content.filepath || this.content.url || this.content.filename;
    }

}



function loadData(dirname, data, parentDirectory=null){
    if (Array.isArray(data)){
        const dir =  new Directory(dirname, parentDirectory, []);
        data.forEach((item) => dir.addContent(loadData(dirname, item, dir)));
        return dir;
        
    }
    else if (typeof data === 'object'){
        return new File(inferName(data) ? inferName(data) : dirname, data, parentDirectory);
    }
    return null;
}

function inferName(data){
    return data.title || data.name || data.filename || data.id;
}


function loadAppData(){
    let data = new Directory('root', null);
    data.addContent(loadData('publications', publications, data));
    data.addContent(loadData('certifications', certifications, data));
    const skillsDir = new Directory('skills', data);
    skillsDir.content = Object.keys(skills).map((item) => loadData(item, skills[item], skillsDir));
    data.addContent(skillsDir);
    data.addContent(loadData('software', software, data));
    const teachingDir = new Directory('teaching', data);
    teachingDir.content = Object.keys(teaching).map((item) => loadData(item, teaching[item], teachingDir));
    data.addContent(teachingDir);
    const scientificDir = new Directory('scientific_activities', data);
    scientificDir.content = Object.keys(scientific_activities).map((item) => loadData(item, scientific_activities[item], scientificDir));
    data.addContent(scientificDir);
    data.addContent(loadData('hobbies', hobbies, data));
    data.addContent(loadData('socials', socials, data));
    data.addContent(loadData('contributing.md', contributing, data));
    return data;
}

const data = loadAppData();


export {data, Directory, File};