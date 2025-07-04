import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { useGetChannelById } from '@/hooks/apis/channels/useGetChannelById';
import { ChannelHeader } from '@/components/molecules/Channel/ChannelHeader';
import { useEffect } from 'react';
import { useSocket } from '@/hooks/context/useSocket';
import { useQueryClient } from '@tanstack/react-query';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useGetChannelMessages } from '@/hooks/apis/channels/useGetChannelMessages';
import { Message } from '@/components/molecules/Message/Message';

export const Channel = () => {

    const { channelId } = useParams();

    const { channelDetails, isFetching, isError } = useGetChannelById(channelId);

    const { joinChannel } = useSocket();

    const queryClient = useQueryClient();

    const { setMessageList, messageList } = useChannelMessages();

    const { messages, isSuccess } = useGetChannelMessages(channelId);


    useEffect(() => {
        console.log('ChannelId', channelId);
        queryClient.invalidateQueries('getPaginatedMessages');
    }, [channelId]);

    useEffect(() => {
        if(!isFetching && !isError) {
            joinChannel(channelId);
        }
    }, [isFetching, isError, joinChannel, channelId]);

    useEffect(() => {
        if(isSuccess ) {
            console.log('Channel Messages fetched');
            setMessageList(messages);
        }
    }, [isSuccess, messages, setMessageList, channelId]);

    if(isFetching) {
        return (
            <div
                className='h-full flex-1 flex items-center justify-center'
            >
                <Loader2Icon className='size-5 animate-spin text-muted-foreground' />
            </div>
        );
    }

    if(isError) {
        return (
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlertIcon className='size-6 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Channel Not found</span>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-full'>
            <ChannelHeader name={channelDetails?.name} />
            {messageList?.map((message) => {
                return <Message key={message._id} body={message.body} authorImage={message.senderId?.avatar} authorName={message.senderId?.username} createdAt={message.createdAt}   />;
            })}
            <div className='flex-1' />

            <ChatInput />
        </div>
    );
};