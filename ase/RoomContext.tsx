// import {
//   useContext,
//   createContext,
//   useState,
//   ReactNode,
//   Dispatch,
// } from "react";
// import { View } from "react-native";

// interface PatientState {
//   room: string;
//   oxygenSaturation?: string;
//   bloodPreasure?: string;
//   heartRate?: string;
//   breathingFrequency?: string;
// }

// const RoomContext = createContext([{}]);
// const RoomUpdateContext = createContext(
//   {} as Dispatch<React.SetStateAction<PatientState[]>>
// );

// export const useRoomData = () => {
//   return useContext(RoomContext);
// };

// export const useRoomUpdateData = () => {
//   return useContext(RoomUpdateContext);
// };

// export const RoomContextProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }): JSX.Element => {
//   const [patientState, setPatientState] = useState<PatientState[]>([]);
//   return (
//     <RoomContext.Provider value={patientState}>
//       <RoomUpdateContext.Provider value={setPatientState}>
//         {children}
//       </RoomUpdateContext.Provider>
//     </RoomContext.Provider>
//   );
// };
