import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Team, Channel } from '../team-list/team-list.component';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-team-component',
  templateUrl: './team-component.component.html',
  styleUrls: ['./team-component.component.css']
})
export class TeamComponent implements OnInit, OnChanges {
  // IMP - Implement addChannel and removeChannel operations within this component
  @Input() team: Team;
  @Input() teamIndex: number;
  currentIndex: number;
  currentState: number;
  addNewChannel: FormGroup;
  sortChannels: string;
  localTeamData: Team;
  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit() {
    this.addNewChannel =  this.fb.group({
      newChannel: ['',[Validators.required,Validators.pattern('^[a-zA-Z]+[0-9]+')]]
    })
  }

  ngOnChanges() {
     this.localTeamData = JSON.parse(JSON.stringify(this.team));
     this.sortChannels = 'NORMAL';
  }
  formValidation() {
    
  }

  removeChannel( index) {
    this.team.channels.splice(index,1); 
  }

  addChannel(event) {
    this.team.channels.push({
      name: this.addNewChannel.get('newChannel').value,
      index: this.team.channels.length
    })
    this.localTeamData.channels.push({
      name: this.addNewChannel.get('newChannel').value,
      index: this.team.channels.length
    })
    this.addNewChannel.reset();
  }

  sort() {
    this.team = JSON.parse(JSON.stringify(this.localTeamData));
    switch(this.sortChannels){
      case 'NORMAL': 
                  this.team.channels.sort((channel1, channel2)=> {
                    if(channel1.name > channel2.name)
                      return 1;
                    if(channel1.name < channel2.name)
                      return -1;
                      return 0
                  });
                  this.sortChannels = 'ASC';
                  break;
      case 'ASC':
        this.team.channels.sort((channel1, channel2)=> {
          if(channel1.name > channel2.name)
            return -1;
          if(channel1.name < channel2.name)
            return 1;
            return 0
        });
                  this.sortChannels = 'DSC';
                  break;
      case 'DSC':
                    this.sortChannels = 'NORMAL';
                    break;
    }
  }

}
