import moment from 'moment';
import { useEffect, useState } from 'react';
import { firebase } from '../firebase';
import collatedTasksExist from '../helpers';


const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
    .firestore()
    .collection('tasks')
    .where('userId', '==', '14c4407abd0249bca485');

    unsubscribe = selectedProject && !collatedTasksExist(selectedProject) ? 
    (unsubscribe = unsubscribe.where('projectId', '==', selectedProject)) : selectedProject === 'TODAY'
    ? (unsubscribe = unsubscribe.where(
      'date',
      '==',
      moment().format('DD/MM/YYYY')
    ))
    : selectedProject === 'INBOX' || selectedProject === 0 
    ? (unsubscribe = unsubscribe.where('date', '==', ''))
    : unsubscribe;

  },[])
}

export default useTasks;