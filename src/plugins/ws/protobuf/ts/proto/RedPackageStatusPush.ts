// @generated by protobuf-ts 2.9.1 with parameter long_type_string
// @generated from protobuf file "proto/RedPackageStatusPush.proto" (syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message RedPackageStatusPush
 */
export interface RedPackageStatusPush {
    /**
     * 红包ID
     *
     * @generated from protobuf field: string packageId = 1;
     */
    packageId: string;
    /**
     * 红包状态
     *
     * @generated from protobuf field: sint64 packageStatus = 2;
     */
    packageStatus: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class RedPackageStatusPush$Type extends MessageType<RedPackageStatusPush> {
    constructor() {
        super("RedPackageStatusPush", [
            { no: 1, name: "packageId", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "packageStatus", kind: "scalar", T: 18 /*ScalarType.SINT64*/ }
        ]);
    }
    create(value?: PartialMessage<RedPackageStatusPush>): RedPackageStatusPush {
        const message = { packageId: "", packageStatus: "0" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<RedPackageStatusPush>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RedPackageStatusPush): RedPackageStatusPush {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string packageId */ 1:
                    message.packageId = reader.string();
                    break;
                case /* sint64 packageStatus */ 2:
                    message.packageStatus = reader.sint64().toString();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: RedPackageStatusPush, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string packageId = 1; */
        if (message.packageId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.packageId);
        /* sint64 packageStatus = 2; */
        if (message.packageStatus !== "0")
            writer.tag(2, WireType.Varint).sint64(message.packageStatus);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message RedPackageStatusPush
 */
export const RedPackageStatusPush = new RedPackageStatusPush$Type();
