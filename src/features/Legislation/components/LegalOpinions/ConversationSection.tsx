import { useState, useRef, useEffect } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { ConversationMessage } from '../../types/legalOpinions.types';

interface ConversationSectionProps {
    messages: ConversationMessage[];
    fontSizeMultiplier?: number;
}

interface MessageItemProps {
    msg: ConversationMessage;
    fontSizeMultiplier: number;
    isArabic: boolean;
    fontFamily: string;
}

const LINE_HEIGHT = 1.7;
const MAX_LINES = 3;

function MessageItem({ msg, fontSizeMultiplier, isArabic, fontFamily }: MessageItemProps) {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    const message = isArabic && msg.messageAr ? msg.messageAr : msg.message;

    useEffect(() => {
        if (textRef.current) {
            const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
            const maxHeight = lineHeight * MAX_LINES;
            const actualHeight = textRef.current.scrollHeight;
            setShowReadMore(actualHeight > maxHeight + 5); // 5px buffer
        }
    }, [message, fontSizeMultiplier]);

    return (
        <div
            className="p-5 rounded-lg border"
            style={{
                backgroundColor: '#F0FDF4',
                borderColor: '#BBF7D0',
            }}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div
                        className="h-8 w-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#22C55E' }}
                    >
                        <span style={{ color: '#FFFFFF', fontSize: `${14 * fontSizeMultiplier}px`, fontWeight: 600 }}>
                            {msg.sender.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <div
                            style={{
                                fontFamily,
                                fontSize: `${15 * fontSizeMultiplier}px`,
                                fontWeight: 600,
                                color: '#15803D'
                            }}
                        >
                            {msg.sender}
                        </div>
                        <div
                            style={{
                                fontFamily,
                                fontSize: `${13 * fontSizeMultiplier}px`,
                                color: '#64748B'
                            }}
                        >
                            {msg.date}
                        </div>
                    </div>
                </div>
                <button
                    className="p-2 rounded-lg hover:bg-green-100 transition-colors"
                    onClick={() => navigator.clipboard.writeText(message)}
                >
                    <Copy className="h-4 w-4" style={{ color: '#15803D' }} />
                </button>
            </div>
            <div
                ref={textRef}
                className="overflow-hidden transition-all duration-300"
                style={{
                    fontFamily,
                    fontSize: `${15 * fontSizeMultiplier}px`,
                    color: '#166534',
                    lineHeight: LINE_HEIGHT,
                    maxHeight: isExpanded ? 'none' : `calc(${15 * fontSizeMultiplier}px * ${LINE_HEIGHT} * ${MAX_LINES})`,
                }}
            >
                {message}
            </div>
            {showReadMore && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    style={{
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        fontFamily,
                        fontSize: `${14 * fontSizeMultiplier}px`,
                        fontWeight: 500,
                    }}
                >
                    {isExpanded ? t('legalOpinions.hideConversation') : t('legalOpinions.readMore')}
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
            )}
        </div>
    );
}

const THEME_COLOR = '#2F4F6F';

export function ConversationSection({ messages, fontSizeMultiplier = 1 }: ConversationSectionProps) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';
    const [showConversation, setShowConversation] = useState(false);

    return (
        <div className="space-y-6">
            {/* Toggle Button */}
            <div className="flex justify-center">
                <button
                    onClick={() => setShowConversation(!showConversation)}
                    className="flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all hover:shadow-md"
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: THEME_COLOR,
                        color: THEME_COLOR,
                        fontFamily,
                        fontSize: `${15 * fontSizeMultiplier}px`,
                        fontWeight: 600,
                    }}
                >
                    <MessageSquare className="h-5 w-5" />
                    {showConversation ? t('legalOpinions.hideConversation') : t('legalOpinions.showConversation')}
                    {showConversation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
            </div>

            {/* Conversation Content */}
            {showConversation && (
                <div
                    className="bg-white rounded-lg border"
                    style={{ borderColor: '#E5E7EB' }}
                >
                    <div
                        className="px-6 py-4 border-b flex items-center justify-between"
                        style={{ borderColor: '#E5E7EB' }}
                    >
                        <div className="flex items-center gap-3">
                            <MessageSquare className="h-5 w-5" style={{ color: THEME_COLOR }} />
                            <h3
                                style={{
                                    fontFamily,
                                    fontSize: `${17 * fontSizeMultiplier}px`,
                                    fontWeight: 600,
                                    color: '#1E293B'
                                }}
                            >
                                {t('legalOpinions.legalOpinionConversation')}
                            </h3>
                        </div>
                        <span
                            style={{
                                fontFamily,
                                fontSize: `${14 * fontSizeMultiplier}px`,
                                color: '#64748B',
                            }}
                        >
                            {messages.length} {t('legalOpinions.messages')}
                        </span>
                    </div>

                    <div className="p-6 space-y-4">
                        {messages.map((msg) => (
                            <MessageItem
                                key={msg.id}
                                msg={msg}
                                fontSizeMultiplier={fontSizeMultiplier}
                                isArabic={isArabic}
                                fontFamily={fontFamily}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

