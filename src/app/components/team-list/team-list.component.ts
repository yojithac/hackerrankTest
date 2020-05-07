import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamList implements OnInit {

  teams: Team[] = [];
  component: Team;
  addNewTeam: FormGroup;
  constructor( private fb: FormBuilder) { 
    this.teams.push({
      name: 'Team1',
      channels: [{
        name: 'channel1',
        index: 1
      },
      {
        name: 'channel2',
        index: 2
      }]
    });
    this.teams.push({
      name: 'Team2',
      channels: [{
        name: 'channel1',
        index: 1
      },
      {
        name: 'channel2',
        index: 2
      }]
    });
  }

  ngOnInit() {
   this.addNewTeam =  this.fb.group({
      newTeam: ['',[Validators.required,Validators.pattern('^[a-zA-Z]+[0-9]+')]]
    })
  }

  formValidation() {
    
  }

  addTeam(event) {
    this.teams.push({
      name: this.addNewTeam.get('newTeam').value,
      channels:[]
    })
    this.addNewTeam.reset();
  }
}

export class Team {
  channels: Channel[];
  name: String
}

export class Channel {
  name: string;
  index: number;
}
