import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export const NoTrailingParagraph = Extension.create({
  name: 'noTrailingParagraph',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('noTrailingParagraph'),
        appendTransaction(transactions, _oldState, newState) {
          if (!transactions.some((tr) => tr.docChanged)) return null;

          const { doc, tr, schema } = newState;
          const lastChild = doc.lastChild;
          if (
            lastChild?.type === schema.nodes.paragraph &&
            lastChild.content.size === 0
          ) {
            const end = doc.content.size;
            const start = end - lastChild.nodeSize;
            return tr.delete(start, end);
          }

          return null;
        },
      }),
    ];
  },
});
