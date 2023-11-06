import { useQuery } from 'react-query';
import axios from 'axios';

export const useAppointments = () => {
    return useQuery(['GET_APPOINTMENTS'], async () => {
        const {data} = await axios.get("http://127.0.0.1:8000/calendar");
        return data;
    });
};