"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useApp } from "../../context/AppContext";

interface WaterModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WaterModal({ isOpen, onOpenChange }: WaterModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Suivi de l'Hydratation</ModalHeader>
        <ModalBody>
          {/* Sélection de la quantité d'eau */}
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => onOpenChange(false)}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 