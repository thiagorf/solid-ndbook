


export interface UseCase<ReceivedData, ReturnedData> {

    perform(receiving?: ReceivedData): Promise<ReturnedData>
}