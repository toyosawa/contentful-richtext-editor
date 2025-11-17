import React from 'react';
import { Document } from '@contentful/rich-text-types';
export { BLOCKS, Block, Document, INLINES, Inline, MARKS, Text } from '@contentful/rich-text-types';
import { Editor } from '@tiptap/react';

interface ContentfulFieldValidation {
    enabledMarks?: string[];
    enabledNodeTypes?: string[];
}
interface ContentfulFieldConfiguration {
    validations?: ContentfulFieldValidation[];
    settings?: {
        helpText?: string;
    };
}
interface ParsedEditorConfig {
    availableHeadings: Array<1 | 2 | 3 | 4 | 5 | 6>;
    availableMarks: Array<'bold' | 'italic' | 'underline'>;
    disabledFeatures: string[];
    allowHyperlinks: boolean;
    allowEmbeddedEntries: boolean;
    allowEmbeddedAssets: boolean;
    allowInlineEntries: boolean;
    allowTables: boolean;
    allowQuotes: boolean;
    allowLists: boolean;
}
/**
 * Parses Contentful field configuration to determine editor capabilities
 */
declare const parseContentfulFieldConfig: (fieldConfiguration?: ContentfulFieldConfiguration) => ParsedEditorConfig;
/**
 * Helper function to fetch Contentful field configuration from Management API
 */
declare const fetchContentfulFieldConfig: (spaceId: string, contentTypeId: string, fieldId: string, accessToken: string) => Promise<ContentfulFieldConfiguration | null>;
/**
 * Creates a mock field configuration for testing purposes
 */
declare const createMockFieldConfig: (options: {
    enabledMarks?: string[];
    enabledNodeTypes?: string[];
}) => ContentfulFieldConfiguration;

interface ContentfulRichTextEditorProps {
    initialValue?: Document;
    onChange?: (document: Document) => void;
    onEmbedEntry?: () => Promise<any> | void;
    onEmbedAsset?: () => Promise<any> | void;
    onEmbedInlineEntry?: () => Promise<any> | void;
    className?: string;
    readonly?: boolean;
    placeholder?: string;
    fieldConfiguration?: ContentfulFieldConfiguration;
    disabledFeatures?: Array<'bold' | 'italic' | 'underline' | 'link' | 'lists' | 'headings' | 'quote' | 'table' | 'embed'>;
    theme?: 'default' | 'minimal' | 'contentful';
    availableHeadings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
    availableMarks?: Array<'bold' | 'italic' | 'underline'>;
    showBorder?: boolean;
}
declare const ContentfulRichTextEditor: React.FC<ContentfulRichTextEditorProps>;

interface ToolbarProps {
    editor: Editor;
    onEmbedEntry?: () => void;
    onEmbedAsset?: () => void;
    onEmbedInlineEntry?: () => void;
    disabledFeatures?: Array<string>;
    availableHeadings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
    availableMarks?: Array<'bold' | 'italic' | 'underline'>;
    allowHyperlinks?: boolean;
}
declare const ContentfulToolbar: React.FC<ToolbarProps>;

interface TiptapNode$1 {
    type: string;
    attrs?: Record<string, any>;
    content?: TiptapNode$1[];
    text?: string;
    marks?: Array<{
        type: string;
        attrs?: Record<string, any>;
    }>;
}
/**
 * Converts a Contentful Rich Text Document to Tiptap JSON format
 */
declare const contentfulToTiptap: (document: Document) => TiptapNode$1;
/**
 * Converts Tiptap JSON format to Contentful Rich Text Document
 */
declare const tiptapToContentful: (tiptapDoc: any) => Document;
/**
 * Validates if a Contentful document is properly formatted
 */
declare const validateContentfulDocument: (document: any) => document is Document;
/**
 * Creates an empty Contentful document
 */
declare const createEmptyDocument: () => Document;
/**
 * Sanitizes a Contentful document by removing invalid nodes/marks based on configuration
 */
declare const sanitizeContentfulDocument: (document: Document, allowedNodeTypes: string[], allowedMarks: string[]) => Document;
/**
 * Extracts plain text from a Contentful document
 */
declare const extractPlainText: (document: Document) => string;
/**
 * Counts words in a Contentful document
 */
declare const countWords: (document: Document) => number;
/**
 * Finds all embedded entries/assets in a document
 */
declare const findEmbeddedContent: (document: Document) => {
    entries: string[];
    assets: string[];
    inlineEntries: string[];
};

type ContentfulEditorTheme = 'default' | 'minimal' | 'contentful';
interface EmbeddedEntry {
    sys: {
        id: string;
        type: string;
        contentType: {
            sys: {
                id: string;
            };
        };
    };
    fields: Record<string, any>;
}
interface EmbeddedAsset {
    sys: {
        id: string;
        type: string;
    };
    fields: {
        title?: string;
        description?: string;
        file?: {
            url: string;
            fileName: string;
            contentType: string;
        };
    };
}

interface EditorFeatureConfig {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
    link?: boolean;
    headings?: Array<1 | 2 | 3 | 4 | 5 | 6>;
    lists?: boolean;
    quote?: boolean;
    table?: boolean;
    embeddedEntries?: boolean;
    embeddedAssets?: boolean;
    inlineEntries?: boolean;
}
interface ContentfulNode {
    nodeType: string;
    data: Record<string, any>;
    content?: Array<ContentfulNode | ContentfulText>;
}
interface ContentfulText {
    nodeType: 'text';
    value: string;
    marks?: Array<{
        type: string;
    }>;
    data: Record<string, any>;
}
interface ContentfulDocument extends ContentfulNode {
    nodeType: 'document';
    content: ContentfulNode[];
}
interface TiptapNode {
    type: string;
    attrs?: Record<string, any>;
    content?: TiptapNode[];
    text?: string;
    marks?: Array<{
        type: string;
        attrs?: Record<string, any>;
    }>;
}
interface TiptapDocument extends TiptapNode {
    type: 'doc';
    content: TiptapNode[];
}
interface EditorState {
    canUndo: boolean;
    canRedo: boolean;
    activeMarks: string[];
    activeNodes: string[];
    currentHeading?: number;
}
type OnChangeCallback = (document: any) => void;
type OnEmbedCallback = () => Promise<EmbeddedEntry | EmbeddedAsset | null> | void;
interface ThemeConfig {
    name: ContentfulEditorTheme;
    className: string;
    toolbarStyle?: 'minimal' | 'full' | 'compact';
    showBorders?: boolean;
    customStyles?: Record<string, string>;
}
interface ValidationRule {
    type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
    value?: any;
    message?: string;
    validator?: (value: any) => boolean | string;
}
interface FieldValidationConfig {
    rules?: ValidationRule[];
    showErrors?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
}
interface LocalizationConfig {
    locale: string;
    messages: Record<string, string>;
    rtl?: boolean;
}
interface A11yConfig {
    ariaLabel?: string;
    ariaDescribedBy?: string;
    announceChanges?: boolean;
    keyboardShortcuts?: Record<string, string>;
}
interface AdvancedEditorConfig {
    autofocus?: boolean;
    spellcheck?: boolean;
    autocomplete?: boolean;
    wordWrap?: boolean;
    lineNumbers?: boolean;
    minimap?: boolean;
    dragDrop?: boolean;
    paste?: {
        plainTextOnly?: boolean;
        cleanupPaste?: boolean;
        preserveWhitespace?: boolean;
    };
    history?: {
        depth?: number;
        newGroupDelay?: number;
    };
}
interface PluginConfig {
    name: string;
    enabled: boolean;
    options?: Record<string, any>;
}
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export { ContentfulRichTextEditor, ContentfulToolbar, contentfulToTiptap, countWords, createEmptyDocument, createMockFieldConfig, extractPlainText, fetchContentfulFieldConfig, findEmbeddedContent, parseContentfulFieldConfig, sanitizeContentfulDocument, tiptapToContentful, validateContentfulDocument };
export type { A11yConfig, AdvancedEditorConfig, ContentfulDocument, ContentfulEditorTheme, ContentfulFieldConfiguration, ContentfulFieldValidation, ContentfulNode, ContentfulRichTextEditorProps, ContentfulText, DeepPartial, EditorFeatureConfig, EditorState, EmbeddedAsset, EmbeddedEntry, FieldValidationConfig, LocalizationConfig, OnChangeCallback, OnEmbedCallback, OptionalFields, ParsedEditorConfig, PluginConfig, RequiredFields, ThemeConfig, TiptapDocument, TiptapNode, ValidationRule };
