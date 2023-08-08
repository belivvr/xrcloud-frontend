import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownViewProps {
    post: string
}

export const MarkdownView = ({ post }: MarkdownViewProps) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                img: ({ node, ...props }) => <img style={{ maxWidth: '50%' }} {...props} alt="" />,
                ul: ({ node, ...props }) => <ul style={{ marginBottom: '12px' }} {...props} />,
                hr: ({ node, ...props }) => <hr style={{ border: '1px solid #eee' }} {...props} />
            }}
        >
            {post}
        </ReactMarkdown>
    )
}
