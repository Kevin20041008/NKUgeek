import MDEditor from '@uiw/react-md-editor';

interface Props {
  value?: string;
  onChange?: (v: string) => void;
  height?: number;
}

export default function MarkdownEditor({ value = '', onChange = () => {}, height = 400 }: Props) {
  return (
    <div className="mt-4" data-color-mode="light">
      <MDEditor value={value} onChange={(v) => onChange(v ?? '')} height={height} preview="edit" />
      <div className="mt-4 text-sm text-gray-500">支持 Markdown 语法，可插入代码块、图片等</div>
    </div>
  );
}
